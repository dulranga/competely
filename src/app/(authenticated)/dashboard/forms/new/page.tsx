"use client";

import { FC } from "react";
import FormBuilder from "~/components/dashboard/FormBuilder";
import { saveFormAction } from "../actions";

const NewFormPage: FC = () => {
    return (
        <div className="space-y-12">
            <div className="grid gap-6">
                <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">New Form</h1>
                <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                    Create a new entry gateway for your competition.
                </p>
            </div>

            <FormBuilder onSave={saveFormAction} />
        </div>
    );
};

export default NewFormPage;
