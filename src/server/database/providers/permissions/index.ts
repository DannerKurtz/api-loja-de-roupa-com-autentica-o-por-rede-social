import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updatedById from "./UpdateById";
import * as DeleteById from "./DeleteById";

export const PermissionProvider = {
    ...create,
    ...getAll,
    ...getById,
    ...updatedById,
    ...DeleteById,
};
