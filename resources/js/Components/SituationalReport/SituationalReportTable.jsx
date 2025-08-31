import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function SituationalReportTable({ reports, onEdit }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Typhoon Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>{report.typhoon_name}</TableCell>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>{report.typhoon_category}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(report)}
                                >
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan="4" className="text-center">
                            No situational reports found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
