"use client";

import React, { useEffect, useRef } from "react";

interface TextAreaProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	placeholder?: string;
}

export function TextArea({ value, onChange, ...props }: TextAreaProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [value]);

	return <textarea ref={textareaRef} value={value} onChange={onChange} rows={1} {...props} />;
}
