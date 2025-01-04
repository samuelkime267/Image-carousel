import { useDispatch as useAppDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";

export const useDispatch: () => AppDispatch = useAppDispatch;
