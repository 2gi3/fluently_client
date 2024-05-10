import { UserT } from "./user";

type Course = {
    id: string;
    creatorId: Pick<UserT, 'name' | 'image'>;
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
    units: Unit[]
};

type Unit = {
    id: string;
    courseId: string;
    title: string;
    type: 'learn' | 'exercise';
    lessons: Lesson[];
};

type Lesson = {
    id: string;
    courseId: string;
    unitId: string;
    title: string;
    videoUrl: string;
    sections: LessonSection[];
    summary: LessonSummary | null;
    vocabulary: LessonVocabulary[];
    exercises: LessonExercise[];
};

type LessonSection = {
    id: string;
    lessonId: string;
    bodyMD: string;
    imageUrl: string;
    noteMD: string;
};

type LessonSummary = {
    id: string;
    lessonId: string;
    summaryMD: string;
    imageUrl: string;
};

type LessonVocabulary = {
    id: string;
    lessonId: string;
    word: string;
    translation: string;
    audioUrl: string;
    imageUrl: string;
};

type LessonExercise = {
    id: string;
    lessonId: string;
    instructionsMD: string;
    sentences: ExerciseSentence[];
    keyValuePairs: ExerciseKeyValuePair[];
};

type ExerciseSentence = {
    id: string;
    exerciseId: string;
    sentence: string;
    imageUrl: string;
    audioUrl: string;
};

type ExerciseKeyValuePair = {
    id: string;
    exerciseId: string;
    key: string;
    value: string;
    imageUrl: string;
    audioUrl: string;
};


