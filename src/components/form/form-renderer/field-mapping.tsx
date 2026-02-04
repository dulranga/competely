import React from "react";
import type { FormFieldType } from "~/consts/forms";
import { TextField } from "./fields/TextField";
import { TextAreaField } from "./fields/TextAreaField";
import { NumberField } from "./fields/NumberField";
import { CheckboxField } from "./fields/CheckboxField";
import { SelectField } from "./fields/SelectField";
import { RadioField } from "./fields/RadioField";
import { FileField } from "./fields/FileField";
import { DateTimeField } from "./fields/DateTimeField";

export const FIELD_COMPONENTS: Record<FormFieldType, React.FC<any>> = {
    text: TextField,
    textarea: TextAreaField,
    number: NumberField,
    checkbox: CheckboxField,
    select: SelectField,
    radio: RadioField,
    file: FileField,
    datetime: DateTimeField,
};
