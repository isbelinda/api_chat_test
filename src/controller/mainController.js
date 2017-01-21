import * as CONFIG from '../app/config';
import * as MODEL from '../app/models';

export const isJsonErrorTemplate = (message) => {
    return {
        isSuccess: false,
        message: message
    }
};

export const isJsonSuccessTemplate = (type, model) => {
    let template = {
        isSuccess: true,
        urlPath: CONFIG.FULLPATH,
        results: model
    };

    if( type == CONFIG.FORMAT_TYPE.OBJECT ){
        template.message = CONFIG.CONSTANT.SAVE_SUCCESS
    }
    
    return template;
};
