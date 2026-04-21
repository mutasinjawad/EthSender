export default function ArrowIcon({ className = 'w-3 h-3', rotate }: { className?: string, rotate?: boolean }) {
    return (
        <div className={`${className} transition-all duration-400 ${rotate ? 'rotate-45' : ''}`} >
            <svg viewBox="607 985 1054 1054" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M 1660.757812 985.066406 L 1660.757812 2038.757812 L 1585.433594 2038.757812 L 1585.433594 1113.648438 L 660.683594 2038.390625 L 607.425781 1985.132812 L 1532.175781 1060.390625 L 607.066406 1060.390625 L 607.066406 985.066406 Z" />
            </svg>
        </div>
    )
}