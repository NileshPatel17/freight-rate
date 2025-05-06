export const Spinner = ({ size = 8 }) => (
    <div className="flex justify-center items-center">
        <div className={`w-${size} h-${size} border-t-2 border-gray-600 border-solid rounded-full animate-spin`} />
    </div>
);