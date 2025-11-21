import Button from "@/components/Elements/Button";
import { cn } from "@/lib/utils";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
    windowSize?: number
};

export function Pagination({ currentPage, totalPages, onPageChange, className, windowSize = 5 }: PaginationProps) {
    const { max, min, floor } = Math

    const pageNumbers: number[] = [];
    const half = floor(windowSize / 2)
    let start = max(currentPage - half, 1)
    let end = min(start + windowSize - 1, totalPages)

    if (end - start + 1 < windowSize) {
        start = max(end - windowSize + 1, 1);
    }

    for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={cn("flex items-center gap-4 mt-6", className)}>
            <Button
                disabled={currentPage <= start}
                onClick={() => onPageChange(currentPage - 1)}>
                Prev
            </Button>
            <div className="flex gap-4">
                {start > 1 && (
                    <>
                        <p className="cursor-pointer" onClick={() => onPageChange(1)}>
                            1
                        </p>
                        {start > 2 && <span className="px-2">...</span>}
                    </>
                )}
                {
                    pageNumbers.map(item => <p onClick={() => onPageChange(item)} className={cn("cursor-pointer hover:text-brand-highlight", currentPage === item && "text-brand-highlight font-bold")} key={item}>{item}</p>)
                }
                {end < totalPages && (
                    <>
                        {end < totalPages - 1 && <span className="px-2">...</span>}
                        <p className="cursor-pointer" onClick={() => onPageChange(totalPages)}>
                            {totalPages}
                        </p>
                    </>
                )}
            </div>
            <Button
                disabled={currentPage >= end}
                onClick={() => onPageChange(currentPage + 1)}>
                Next
            </Button>
        </div>
    );
}
