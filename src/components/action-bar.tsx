import { Button } from "@mui/material";
import { useActions } from "../hooks/use-actions";
import "./action-bar.css";

interface ActionBarProps {
	id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
	const { moveCell, deleteCell } = useActions();
	return (
		<div className="action-bar">
			<Button className="button is-primary is-small" onClick={() => moveCell(id, "up")}>
				<span className="icon">
					<i className="fas fa-arrow-up"></i>
				</span>
			</Button>
			<Button className="button is-primary is-small" onClick={() => moveCell(id, "down")}>
				<span className="icon">
					<i className="fas fa-arrow-down"></i>
				</span>
			</Button>
			<Button className="button is-primary is-small" onClick={() => deleteCell(id)}>
				<span className="icon">
					<i className="fas fa-times"></i>
				</span>
			</Button>
		</div>
	);
};

export default ActionBar;
