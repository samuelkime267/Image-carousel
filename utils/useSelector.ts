import type { TypedUseSelectorHook } from "react-redux";
import { useSelector as useAppSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
