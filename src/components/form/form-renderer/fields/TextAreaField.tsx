import { Textarea } from "~/components/ui/textarea";
import Form from "../../Form";

export const TextAreaField = ({ name, label, placeholder }: { name: string; label: string; placeholder?: string }) => (
    <Form.Item name={name} label={label}>
        <Textarea placeholder={placeholder || label} className="mt-4" />
    </Form.Item>
);
