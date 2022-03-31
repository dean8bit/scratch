import "./add-cell.css";
import { useActions } from "../hooks/use-actions";
import { Button } from "@mui/material";

interface AddCellProps {
	forceVisible?: boolean;
	previousCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
	const { insertCellAfter } = useActions();
	return (
		<div className={`add-cell ${forceVisible && "force-visible"}`}>
			<div className="add-buttons">
				<Button
					className="button is-rounded is-primary is-small"
					onClick={() => insertCellAfter(previousCellId, "code")}
				>
					<span className="icon is-small">
						<i className="fas fa-plus" />
					</span>
					<span>Code</span>
				</Button>
				<Button
					className="button is-rounded is-primary is-small"
					onClick={() => insertCellAfter(previousCellId, "text")}
				>
					<span className="icon is-small">
						<i className="fas fa-plus" />
					</span>
					<span>Text</span>
				</Button>
			</div>
			<div className="divider"></div>
		</div>
	);
};
export default AddCell;
