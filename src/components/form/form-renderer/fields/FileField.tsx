import { Controller, useFormContext } from "react-hook-form";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "../../Form";

export const FileField = ({ name, label }: { name: string; label: string }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, ...props }) => (
                <Form.CustomController label={label} field={field} {...props}>
                    <FileUpload
                        className="mt-4"
                        endpoint="/api/upload?type=form_upload"
                        onChange={(files) => {
                            const ids = files.map((f) => (f.response as any)?.id).filter(Boolean);
                            field.onChange(ids);
                        }}
                    />
                </Form.CustomController>
            )}
        />
    );
};
