declare const fileFilter: {
    fileFilter: (req: any, file: any, cb: any) => any;
    limits: {
        fileSize: number;
    };
};
export { fileFilter };
