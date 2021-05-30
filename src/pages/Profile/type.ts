export interface ProfileType {
  basic_person: {
    id: string;
    name: string;
    phone: string;
    major: string;
    email: string;
    politics: string;
    hometown: string;
    nation: string;
    blood_type: string;
    campus: string;
    dormitory: string;
    wechat: string;
    qq: string;
    birthday: string;
    gender: string;
    status: number; // in {0, 1, 2}
  };
  takes: {
    course_id: string;
    section_id: string;
    grade: number;
  }[];
}
