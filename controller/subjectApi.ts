import { Subject, SubjectModel } from "../mongoDBModel/subjectModel";

export async function getAllSubjects() {
    const result = await SubjectModel.find({}).exec();
    // console.log(result);

    return result;
}

export async function addSubject(subject:Subject) {
    const SubjectDoc = new SubjectModel(subject);
    return await SubjectDoc.save();
}