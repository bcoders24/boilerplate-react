import { Stack, Box } from "@mui/material";
import Controls from "src/components/controls/Controls";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "src/utils/Validations";
import { useEffect } from "react";
import { UserValues } from "src/models/data/UserModal";
import dayjs from "dayjs";
import { InitialValues } from "src/constants";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

type UserFormTypes = {
  addOrEdit: (data: UserValues) => void;
  recordForEdit?: UserValues;
  handleClose: () => void;
};

export default function UserForm({
  // addOrEdit,
  recordForEdit,
  handleClose,
}: UserFormTypes) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserValues>({
    resolver: yupResolver(userSchema),
    defaultValues: InitialValues.userValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    // addOrEdit(data);
  };

  const onCancel = () => {
    handleClose();
  };

  useEffect(() => {
    if (recordForEdit) {
      Object.keys(recordForEdit).forEach((key) => {
        const typedKey = key as keyof UserValues;
        let valueToSet = recordForEdit[key];
        if (
          valueToSet !== null &&
          valueToSet !== undefined &&
          valueToSet !== ""
        ) {
          if (typedKey === "date") valueToSet = dayjs(valueToSet);
          setValue(typedKey, valueToSet);
        }
      });
    }
  }, []);

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-y-5"
      >
        <Stack
          direction="row"
          gap="20px"
          justifyContent="center"
          alignItems="start"
        >
          <Stack direction="column" gap="12px" flex="1">
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Controls.Input
                  label="Full Name"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Controls.Input
                  label="Email"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Controls.Input
                  label="Phone"
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.phone?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" gap="12px" flex="1">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Controls.RadioGroup
                  label="Gender"
                  value={field.value}
                  onChange={field.onChange}
                  items={genderItems}
                />
              )}
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Controls.DatePicker
                  label="Date"
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              )}
            />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap="20px"
        >
          <Controls.Button text="Cancel" color="inherit" onClick={onCancel} />
          <Controls.Button type="submit" text="Submit" />
        </Stack>
      </form>
    </Box>
  );
}
