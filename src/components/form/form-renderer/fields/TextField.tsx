import { Input } from "~/components/ui/input";
import Form from "../../Form";

export const TextField = ({ name, label, placeholder }: { name: string; label: string; placeholder?: string }) => (
    <Form.Item name={name} label={label}>
        <Input placeholder={placeholder || label} />
    </Form.Item>
);
