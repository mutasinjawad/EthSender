import {
    UserRejectedRequestError,
    InsufficientFundsError,
    ContractFunctionRevertedError,
    ContractFunctionExecutionError,
    TransactionNotFoundError,
    WaitForTransactionReceiptTimeoutError,
    ChainMismatchError,
    HttpRequestError,
    TimeoutError,
    SwitchChainError,
} from "viem";

import {
    ConnectorNotFoundError,
    ConnectorAccountNotFoundError,
    ConnectorChainMismatchError,
    SwitchChainNotSupportedError,
} from "wagmi";

export function getErrorMessage(err: unknown): string {
    if (!(err instanceof Error)) return "An unknown error occurred.";

    // User rejected
    if (err instanceof UserRejectedRequestError ||
        err.message.includes("User denied") ||
        err.message.includes("User rejected")) {
        return "Transaction cancelled — you rejected the request.";
    }

    // Wallet / connector
    if (err instanceof ConnectorNotFoundError) {
        return "No wallet found — please install MetaMask or another wallet.";
    }
    if (err instanceof ConnectorAccountNotFoundError) {
        return "Wallet account not found — please reconnect your wallet.";
    }
    if (err instanceof ConnectorChainMismatchError || err instanceof ChainMismatchError) {
        return "Wrong network — please switch to the correct network in your wallet.";
    }
    if (err instanceof SwitchChainNotSupportedError) {
        return "Your wallet doesn't support switching networks automatically — please switch manually.";
    }

    // Funds / gas
    if (err instanceof InsufficientFundsError) {
        return "Insufficient funds — you don't have enough ETH to cover gas fees.";
    }

    // Contract revert
    if (err instanceof ContractFunctionRevertedError) {
        const reason = err.data?.errorName ?? err.shortMessage ?? err.message;
        return `Transaction reverted: ${reason}`;
    }

    // Contract execution (e.g., RPC timeouts during contract calls)
    if (err instanceof ContractFunctionExecutionError) {
        if (err.message.includes("Transport request timed out") || err.message.includes("RPCErr53")) {
            return "RPC network timeout — the node took too long to respond. Please try again or switch your network's RPC URL.";
        }
    }

    // Timeouts
    if (err instanceof WaitForTransactionReceiptTimeoutError) {
        return "Transaction timed out — it may still be pending. Check your wallet.";
    }
    if (err instanceof TimeoutError) {
        return "Request timed out — please check your connection and try again.";
    }

    // Dropped from mempool
    if (err instanceof TransactionNotFoundError) {
        return "Transaction was dropped from the network — please try again.";
    }

    // Network
    if (err instanceof HttpRequestError) {
        return "Network error — could not reach the RPC. Check your connection.";
    }

    // Viem shortMessage fallback (cleaner than full message)
    if ("shortMessage" in err && typeof (err as any).shortMessage === "string") {
        return (err as any).shortMessage;
    }

    // Walk down cause chain as last resort
    let cause: Error | undefined = err;
    while ((cause as any).cause instanceof Error) {
        cause = (cause as any).cause;
    }
    return cause?.message ?? err.message;
}