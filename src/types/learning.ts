import { UserT } from "./user";

export type CourseT = {
    id: string;
    creatorId: number | string;
    mediumLanguage: "english" | "thai";
    learningLanguage: "english" | "thai";
    title: string;
    subheading: string;
    introductionMD: string;
    goalsMD: string;
    requirementsMD: string;
    videoUrl: string;
    imageUrl: string;
    level: number;
    created_at: Date;
    units?: UnitT[]
};

export type UnitT = {
    id: string;
    courseId: string;
    title: string;
    type: 'learn' | 'exercise';
    lessons: LessonT[];
};

export type LessonT = {
    id: string;
    courseId: string;
    unitId: string;
    title: string;
    videoUrl: string;
    sections: LessonSectionT[];
    summary: LessonSummaryT | null;
    vocabulary: LessonVocabularyT[];
    exercises: LessonExerciseT[];
};

export type LessonSectionT = {
    id: string;
    lessonId: string;
    bodyMD: string;
    imageUrl: string;
    noteMD: string;
};

export type LessonSummaryT = {
    id: string;
    lessonId: string;
    summaryMD: string;
    imageUrl: string;
};

export type LessonVocabularyT = {
    id: string;
    lessonId: string;
    word: string;
    translation: string;
    audioUrl: string;
    imageUrl: string;
};

export type LessonExerciseT = {
    id: string;
    lessonId: string;
    instructionsMD: string;
    sentences: ExerciseSentenceT[];
    keyValuePairs: ExerciseKeyValuePairT[];
};

export type ExerciseSentenceT = {
    id: string;
    exerciseId: string;
    sentence: string;
    imageUrl: string;
    audioUrl: string;
};

export type ExerciseKeyValuePairT = {
    id: string;
    exerciseId: string;
    key: string;
    value: string;
    imageUrl: string;
    audioUrl: string;
};

export interface MarkdownEditorProps {
    title: string;
    placeholder: string;
    numberOfLines: number;
    value: string;
    maxLength: number;
    onChangeText: (text: string) => void;
}