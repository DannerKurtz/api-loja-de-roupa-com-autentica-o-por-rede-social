import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updatedById from "./UpdatedById";
import * as deleteById from "./DeleteById";

export const PermissionControllers = {
    ...create,
    ...getAll,
    ...getById,
    ...updatedById,
    ...deleteById,
};
