export interface Task {
  _id: string
  title: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
//   folderID: Types.ObjectId;
//   user: Types.ObjectId;
  newFolderName: string;
}

export interface TaskFolder {
  _id: string;
  name: string;
//   user: Types.ObjectId;
  tasks: Task[];
}