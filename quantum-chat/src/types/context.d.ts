import { Dispatch, SetStateAction } from "react";

type Prompt = string;
type RecentPrompt = string;
type ResultData = string;
type ShowResult = boolean;
type Loading = boolean;

type SetPrevPrompts = Dispatch<SetStateAction<Prompt[]>>;
type SetPrevAnswers= Dispatch<SetStateAction<Prompt[]>>;
type SetRecentPrompt = Dispatch<SetStateAction<RecentPrompt>>;
type SetInput = Dispatch<SetStateAction<Prompt>>;
type SetShowResult = Dispatch<SetStateAction<ShowResult>>;
type SetLoading = Dispatch<SetStateAction<Loading>>;
type SetResultData = Dispatch<SetStateAction<ResultData>>;

type OnSent = (prompt: Prompt) => Promise<void>;

interface ChatContextType {
    prevPrompts: Prompt[];
    setPrevPrompts: SetPrevPrompts;
    onSent: OnSent;
    setRecentPrompt: SetRecentPrompt;
    recentPrompt: RecentPrompt;
    showResult: ShowResult;
    loading: Loading;
    resultData: ResultData;
    input: Prompt;
    setInput: SetInput;
    setResultData: SetResultData;
    prevAnswers: Prompt[];
    setPrevAnswers: SetPrevAnswers;
  }