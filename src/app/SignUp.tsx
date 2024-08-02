// npm install react-native-svg
// npm install react-native-svg
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Animated } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../support/firebase";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.shapeContainer}>
        <Svg height="100%" width={width + 50} viewBox={`0 0 ${width + 50} 374`} style={styles.shape}>
          <Defs>
            <LinearGradient id="grad" x1="375" y1="373.158" x2="-124.768" y2="334.295" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor="#92A3FD" stopOpacity="1" />
              <Stop offset="1" stopColor="#9DCEFF" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Path
            d="M0 145.599C0 145.599 13.8333 103.439 42.7333 114.378C83.0333 129.606 186.333 373.158 294.733 373.158C350.3 373.158 375 330.599 375 330.599V0H0V145.599Z"
            fill="url(#grad)"
          />
        </Svg>
      </View>
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

          </View>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.linkText} onPress={() => router.navigate("./Login")}>Login</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shapeContainer: {
    width: '100%',
    height: height * 0.35,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
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
