import {notification} from "antd";

export const openSuccessStudentAddedNotification = () => {
    notification['success']({
        message: 'Student Added',
        description:
            'Student Added Successfully.',
        placement: "top"
    });
};
export const openSuccessStudentRemovedNotification = () => {
    notification['success']({
        message: 'Student Removed',
        description:
            'Student Removed Successfully.',
        placement: "top"
    });
};

export const openErrorServerNotification = (title,description) => {
    notification['error']({
        message: title,
        description: description,
        placement: "top"
    });
};
