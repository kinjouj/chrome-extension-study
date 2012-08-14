#include <npapi.h>

extern "C" {
    const char *NP_GetMIMEDescription(void) {
        return "application/x-hoge::Hoge Plugin";
    }

    NPError NP_GetValue(NPP instance, NPPVariable variable, void *value) {
        switch (variable) {
            case NPPVpluginNameString:
                *static_cast<const char **>(value) = "x-hoge";
                break;

            case NPPVpluginDescriptionString:
                *static_cast<const char **>(value) = "Hoge Plugin";
                break;

            default:
                return NPERR_INVALID_PARAM;

                break;
        }

        return NPERR_NO_ERROR;
    }
}
