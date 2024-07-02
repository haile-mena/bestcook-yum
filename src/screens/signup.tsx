import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../support/firebase";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
};

function SignUp() {
  const { control, formState, handleSubmit, setError } = useForm<FormValues>({
    defaultValues,
  });
  const [values, setValues] = useState({ email: "", password: "" });

  const onSubmit = async (values: FormValues) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
    } catch (e) {
      const error = e as AuthError;
      console.log(e);
    }
  };
  console.log(formState.errors);
  return (
    <View>
      <Text> Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Please enter your school email adress" }}
        render={(field: {onBlur, onChange, value} ) = (
          <TextInput onBlur = {onBlur} onChangeText = {onChange} placeholder = "Enter your School email." value = {value} />
        )}
      />

      <Text> Password</Text>
      <TextInput
        onChangeText={(text) => setValues({ ...values, password: text })}
        placeholder="Enter your password "
        value={values.password}
      ></TextInput>

      <Button title="sign-up" onPress={onSubmit} />
    </View>
  );
}

export default SignUp;
