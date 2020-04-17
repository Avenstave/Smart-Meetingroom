export class device {
    id: string;
    name: string;
    status: number;
    customer_status: number;
    meet_num: string;
}

export class humituer {
    humd: string;
    temp: string;
    time: Date;
}
export class env {
    light: string;
    time: Date;
}
export class env2 {
    pM: string;
    o2: string;
    time: Date;
}
export class env3 {
    yw: string;
    time: Date;
}

export class user {
    userId: string;
    username: string;
    password: string;
    sex: string;
    phone: string;
}
export class meetingroom {
    meet_num: string;
    status: number;
}
export class message {
    user: string;
    meet_num: string;
    status: number;
    time: Date;
}