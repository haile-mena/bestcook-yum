// npm install react-native-svg
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";
import { auth, db } from "../support/firebase";

const { height, width } = Dimensions.get('window');

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
      }
    } catch (e) {
      const error = e as AuthError;
      console.log(e);
      // Handle error, e.g., setError for the form
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Hey there,</Text>
          <Text style={styles.headerTextBold}>Create an Account</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="First Name"
              value={firstname}
              onChangeText={setFirstname}
              style={styles.input}
            />
            <TextInput
              placeholder="Last Name"
              value={lastname}
              onChangeText={setLastname}
              style={styles.input}
            />
            <TextInput
              placeholder="University"
              value={university}
              onChangeText={setUniversiry}
              style={styles.input}
            />
            <Controller
              control={control}
              name="email"
              rules={{ required: "Please enter your school email address" }}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Email"
                  value={value}
                  style={styles.input}
                />
              )}
            />
            {formState.errors.email && <Text style={styles.errorText}>{formState.errors.email.message}</Text>}
            <Controller
              control={control}
              name="password"
              rules={{ required: true, minLength: 6 }}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Password"
                  value={value}
                  style={styles.input}
                  secureTextEntry
                />
              )}
            />
            {formState.errors.password && <Text style={styles.errorText}>{formState.errors.password.message}</Text>}
            <View style={styles.termsContainer}>
              <Text>By continuing you accept our <Text style={styles.linkText}>Privacy Policy</Text> and <Text style={styles.linkText}>Term of Use</Text></Text>
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Or</Text>
            <View style={styles.socialContainer}>
              {/* Add social login buttons here */}
            </View>
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.linkText} onPress={() => router.navigate("./Login")}>Login</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 20,
  },
  headerTextBold: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  errorText: {
    color: 'red',
  },
  termsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#92A3FD',
  },
  registerButton: {
    backgroundColor: '#92A3FD',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignUp;
