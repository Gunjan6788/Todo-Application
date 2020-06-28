import {
    ADD_TODO,
    EDIT_ITEM,
    DEL_ITEM,
    CHECK_BOX,
    CLEAR_COMPLETE_TASK
} from "./actionTypes";
import { getData } from "../../LocalStorage/LocalStorage";
import { saveData } from "../../LocalStorage/LocalStorage";

const initState = {
    todoArr: getData("todoArr") || [],
    cartArr: getData("cartArr") || [],
};

export const todoreducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TODO:
            saveData("todoArr", [action.payload, ...state.todoArr]);
            return {
                ...state,
                todoArr: [action.payload, ...state.todoArr],
            };
        case EDIT_ITEM: {
            console.log(action)
            saveData(
                "todoArr",
                state.todoArr.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, item: action.payload.value }
                        : item
                )
            );
            return {
                ...state,
                todoArr: state.todoArr.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, item: action.payload.value }
                        : item
                ),
            };
        }

        case DEL_ITEM: {
            saveData(
                "todoArr",
                state.todoArr.filter((item) =>
                    item.id === action.payload ? null : item
                )
            );
            return {
                ...state,
                todoArr: state.todoArr.filter((item) =>
                    item.id === action.payload ? null : item
                ),
            };
        }
        case CHECK_BOX: {
            console.log("checkbox")
            let completeItem = state.todoArr.find(item => item.id === action.payload)
            saveData(
                "todoArr",
                state.todoArr.filter((item) =>
                    item.id === action.payload ? null : item
                ),
                saveData("cartArr", [completeItem, ...state.cartArr])

            );
            return {
                ...state,
                todoArr: state.todoArr.filter((item) =>
                    item.id === action.payload ? null : item
                ),
                cartArr: [completeItem, ...state.cartArr]
            };
        }

        case CLEAR_COMPLETE_TASK : {
            saveData("cartArr", [])

            return {
                ...state,
                cartArr:[]
            }
        }
        default:
            return { ...state };
    }
};
