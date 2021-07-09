export type ProfileType = {
  basic_person: InfoType;
  takes: {
    course_id: string;
    section_id: string;
    grade: number;
  }[];
};

export type InfoType = {
  id: string;
  name: string;
  phone: string;
  major: string;
  email: string;
  politics: string;
  hometown: string;
  nation: string;
  blood_type: string;
  address: string;
  wechat: string;
  qq: string;
  birthday: string;
  gender: string;
  status: number; // in {0, 1, 2}
};
