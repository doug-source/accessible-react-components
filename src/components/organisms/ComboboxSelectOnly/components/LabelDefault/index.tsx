type LabelDefaultProps = {
    itemName: string;
};

export const LabelDefault = ({ itemName }: LabelDefaultProps) => (
    <>
        <span>Choose the </span>
        <span>{itemName}</span>
    </>
);
