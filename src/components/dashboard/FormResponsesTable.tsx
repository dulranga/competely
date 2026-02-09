"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ExternalLink, User, Download } from "lucide-react";
import { FC, useMemo } from "react";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { cn } from "~/lib/utils";
import { renderFieldValue } from "./FormResponsesFieldRenderers";

interface FormResponsesTableProps {
    fields: any[];
    responses: any[];
    total: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
}

const FormResponsesTable: FC<FormResponsesTableProps> = ({ fields, responses, total, page, limit, onPageChange }) => {
    const columns = useMemo<ColumnDef<any>[]>(() => {
        const dynamicCols: ColumnDef<any>[] = fields.map((field) => ({
            accessorKey: field.id,
            header: field.name,
            cell: ({ getValue }) => renderFieldValue(getValue(), field),
        }));

        return [
            {
                id: "user",
                header: "Delegate",
                accessorFn: (row) => row.user.name,
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-background border border-border/40 flex items-center justify-center text-foreground/40">
                            {row.original.user.image ? (
                                <img
                                    src={row.original.user.image}
                                    alt=""
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            ) : (
                                <User size={14} />
                            )}
                        </div>
                        <div>
                            <div className="font-bold text-xs text-foreground">{row.original.user.name}</div>
                            <div className="text-[10px] text-foreground/40">{row.original.user.email}</div>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: "submittedAt",
                header: "Submitted",
                cell: ({ getValue }) => (
                    <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                        {new Date(getValue() as string).toLocaleDateString()}
                    </div>
                ),
            },
            ...dynamicCols,
            {
                id: "actions",
                header: () => <div className="text-right">Actions</div>,
                cell: () => (
                    <div className="flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-lg text-foreground/30 hover:text-foreground"
                        >
                            <ExternalLink size={14} />
                        </Button>
                    </div>
                ),
            },
        ];
    }, [fields]);

    const data = useMemo(() => {
        return responses.map((r) => {
            const row: any = {
                id: r.id,
                user: r.user,
                submittedAt: r.submittedAt,
            };
            r.answers.forEach((a: any) => {
                row[a.fieldId] = a.value;
            });
            return row;
        });
    }, [responses]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(total / limit),
    });

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-foreground/40 uppercase tracking-widest">
                    {total} Responses Found
                </div>
            </div>

            <div className="rounded-xl bg-white border border-border/60 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-border/40">
                                {headerGroup.headers.map((header, index) => {
                                    const isLast = index === headerGroup.headers.length - 1;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                "px-6 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/30 whitespace-nowrap",
                                                isLast &&
                                                    "sticky right-0 bg-white shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.05)] z-20",
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="divide-y divide-border/40">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="group hover:bg-background/30 transition-colors border-none"
                                >
                                    {row.getVisibleCells().map((cell, index) => {
                                        const isLast = index === row.getVisibleCells().length - 1;
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    "px-6 py-4",
                                                    isLast &&
                                                        "sticky right-0 bg-white group-hover:bg-background/30 transition-colors z-10",
                                                )}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-foreground/20">
                                            <User size={32} />
                                        </div>
                                        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
                                            No responses yet
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        className="w-10 h-10 rounded-xl border border-transparent hover:border-border/60 text-foreground/40 hover:text-foreground"
                    >
                        <ChevronLeft size={20} />
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <Button
                                key={i}
                                variant="ghost"
                                size="sm"
                                onClick={() => onPageChange(i + 1)}
                                className={cn(
                                    "w-10 h-10 rounded-xl font-black text-xs",
                                    page === i + 1
                                        ? "bg-foreground text-white shadow-lg"
                                        : "text-foreground/40 hover:text-foreground hover:bg-background",
                                )}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                        className="w-10 h-10 rounded-xl border border-transparent hover:border-border/60 text-foreground/40 hover:text-foreground"
                    >
                        <ChevronRight size={20} />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FormResponsesTable;
