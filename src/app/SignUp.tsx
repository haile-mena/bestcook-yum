import { auth, db } from "../support/firebase";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Text, Button, View } from "react-native";
import { router } from "expo-router";

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
};

function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [university, setUniversiry] = useState("");
  const { control, formState, handleSubmit, setError } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      if (user) {
        console.log("A user exists and the uid is : ", user.uid);
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          firstName: firstname,
          lastName: lastname,
          University: university,
          swipes: 30,
          allergiesCompleted: false,
          createdAt: new Date(),
        });
        router.navigate("./Allergies");
      } else {
        console.log("The user does not exist");
      }
    } catch (e) {
      const error = e as AuthError;
      console.log(e);
      // Handle error, e.g., setError for the form
    }
  };

  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>Hey there!</Text>
      <Text>Create an account</Text>
      <Text>First name</Text>
      <TextInput
        placeholder="First name"
        value={firstname}
        onChangeText={setFirstname}
      />
      <Text>Last name</Text>
      <TextInput
        placeholder="Last name"
        value={lastname}
        onChangeText={setLastname}
      />
      <Text>University</Text>
      <TextInput
        placeholder="University"
        value={university}
        onChangeText={setUniversiry}
      />

      <Text> Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Please enter your school email address" }}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your School email."
            value={value}
          />
        )}
      />
      {formState.errors.email && <Text>{formState.errors.email.message}</Text>}

      <Text> Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: true, minLength: 6 }}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your password"
            value={value}
          />
        )}
      />
      {formState.errors.password && (
        <Text>{formState.errors.password.message}</Text>
      )}

      <Button title="Register" onPress={handleSubmit(onSubmit)} />

      <Text>
        Already have an account?
        <Text onPress={() => router.navigate("./Login")}>Login</Text>
      </Text>
    </View>
  );
}

export default SignUp;
