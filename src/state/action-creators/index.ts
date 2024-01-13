import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
} from "../actions";
import { Cell, CellTypes } from "../cell";
import bundle from "../../bundler";
import localForage from "localforage";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

const cellCache = localForage.createInstance({
  name: "cellcache",
});

const getInitCells = (): Cell[] => {
  return [
    { id: "0", type: "text", content: "# **JavaScript scratch pad**" },
    {
      id: "1",
      type: "text",
      content:
        "Just import something... and modules it will automatically be downloaded and bundled.",
    },
    {
      id: "2",
      type: "code",
      content:
        'import React from "react";\nimport ReactDOM from "react-dom";\n\nconst helloWorld = () => { return <h1>Hello World</h1> }\n\nReactDOM.render(\n\t<div>\n\t\t{helloWorld()}\n\t</div>,\n\tdocument.getElementById("root")\n);',
    },
    {
      id: "3",
      type: "text",
      content: "Add a new block by hovering between a code or text block.\n\n ",
    },
    {
      id: "4",
      type: "code",
      content:
        'ReactDOM.render(\n\t<div>\n\t\t<h1>Code accumulates between blocks</h1>\n\t\t{helloWorld()}\n\t</div>,\n\tdocument.getElementById("root")\n);',
    },
  ];
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const data = await cellCache.getItem<Cell[]>("cellscache");

      if (data !== null && data.length > 0)
        dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
      else {
        await cellCache.setItem<Cell[]>("cellscache", getInitCells());
        const data = await cellCache.getItem<Cell[]>("cellscache");
        if (data !== null && data.length > 0)
          dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
        else
          dispatch({
            type: ActionType.FETCH_CELLS_ERROR,
            payload: "could not retreive cells",
          });
      }
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const saveCells = () => {
  console.log("saving");
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);

    try {
      await cellCache.setItem("cellscache", cells);
    } catch (err: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};
