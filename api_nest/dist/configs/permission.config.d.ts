export declare const permissions: ({
    name: string;
    actions: {
        index: boolean;
        create: boolean;
        show: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        showMenu: boolean;
        changePassword: boolean;
    };
} | {
    name: string;
    actions: {
        index: boolean;
        create: boolean;
        show: boolean;
        edit: boolean;
        delete: boolean;
        export: boolean;
        showMenu: boolean;
        changePassword?: undefined;
    };
} | {
    name: string;
    actions: {
        index: boolean;
        show: boolean;
        create?: undefined;
        edit?: undefined;
        delete?: undefined;
        export?: undefined;
        showMenu?: undefined;
        changePassword?: undefined;
    };
})[];
