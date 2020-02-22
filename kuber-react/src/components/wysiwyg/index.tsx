import React from "react";

interface IProps {
  html: string;
}
export const Wizzy: React.FC<IProps> = ({ html }: IProps) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
