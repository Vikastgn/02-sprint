
type Props = {
    title: string
    callBack: () => void
};
export const Button = ({title, callBack}: Props) => {

    const onClickHandler =() => {
        callBack()
    }

    return (
        <button onClick={onClickHandler}>{title}</button>
    );
};