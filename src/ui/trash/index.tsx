import "./trash.scss";

type Props = {
  func: () => void;
};

export const Trash: React.FC<Props> = ({ func }) => {
  return <button className="trash" onClick={func}></button>;
};
