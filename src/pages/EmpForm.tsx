import { Stack, Box } from "@mui/material";
import Controls from "src/components/controls/Controls";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeSchema } from "src/utils/Validations";
import { useEffect } from "react";
import { EmployeeValues } from "src/models/data/EmployeeModel";
import Options from "src/constants/Options";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialValues = {
  id: "",
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "",
  departmentId: "",
  hireDate: null,
  isPermanent: false,
};

type EmployeeFormProps = {
  addOrEdit: (data: EmployeeValues) => void;
  recordForEdit?: EmployeeValues;
};

export default function EmployeeForm({
  addOrEdit,
  recordForEdit,
}: EmployeeFormProps) {
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<EmployeeValues>({
    resolver: yupResolver(employeeSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    console.log({ ...data, hireDate: data.hireDate?.toLocaleString() });
    // addOrEdit(data);
  };

  useEffect(() => {
    if (recordForEdit) {
      Object.keys(recordForEdit).forEach((key) => {
        const typedKey = key as keyof EmployeeValues;
        const valueToSet = recordForEdit[key];
        if (
          valueToSet !== null &&
          valueToSet !== undefined &&
          valueToSet !== ""
        ) {
          setValue(typedKey, valueToSet);
        }
      });
    }
  }, []);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
        <Stack
          direction="row"
          gap="20px"
          justifyContent="center"
          alignItems="start"
        >
          <Stack direction="column" gap="20px" flex="1">
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Controls.Input
                  placeholder="Full name"
                  label="Full name"
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
                  placeholder="Email"
                  label="Email"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <Controls.Input
                  label="Mobile"
                  placeholder="Mobile"
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.mobile?.message}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Controls.Input
                  placeholder="City"
                  label="City"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Stack>
          <Stack direction="column" gap="20px" flex="1">
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
              name="departmentId"
              control={control}
              render={({ field }) => (
                <Controls.Select
                  label="Department"
                  value={field.value}
                  placeholder="Select Department"
                  onChange={field.onChange}
                  error={errors.departmentId?.message}
                  options={Options.EmployeeOptions}
                />
              )}
            />
            <Controller
              name="hireDate"
              control={control}
              render={({ field }) => (
                <Controls.DatePicker
                  label="Hire date"
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              )}
            />
            <Controller
              name="isPermanent"
              control={control}
              render={({ field }) => (
                <Controls.Checkbox
                  label="Permanent Employee"
                  checked={field.value}
                  onChange={field.onChange}
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
          <Controls.Button type="submit" text="Submit" />
          <Controls.Button
            text="Reset"
            color="primary"
            onClick={() => reset()}
          />
        </Stack>
      </form>
    </Box>
  );
}
