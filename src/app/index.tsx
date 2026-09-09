import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

const courses = ['Starter', 'Main Course', 'Dessert'];

export default function Index() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [errors, setErrors] = useState({
    dishName: '',
    description: '',
    course: '',
    price: '',
  });

  const addMenuItem = () => {
    const newErrors = {
      dishName: '',
      description: '',
      course: '',
      price: '',
    };

    let hasError = false;

    if (!dishName.trim()) {
      newErrors.dishName = 'Please enter the dish name.';
      hasError = true;
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a description.';
      hasError = true;
    }

    if (!course) {
      newErrors.course = 'Please select a course.';
      hasError = true;
    }

    if (!price.trim()) {
      newErrors.price = 'Please enter a price.';
      hasError = true;
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Please enter a valid price greater than 0.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    setMenuItems((currentItems) => [...currentItems, newItem]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');

    setErrors({
      dishName: '',
      description: '',
      course: '',
      price: '',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Chef's Menu Manager</Text>
            <Text style={styles.subtitle}>
              Add and manage your menu items
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Add Menu Item</Text>

            <Text style={styles.label}>Dish Name</Text>

            <TextInput
              style={[
                styles.input,
                errors.dishName ? styles.inputError : null,
              ]}
              placeholder="e.g. Grilled Chicken"
              placeholderTextColor="#8B8175"
              value={dishName}
              onChangeText={setDishName}
            />

            {errors.dishName ? (
              <Text style={styles.errorText}>{errors.dishName}</Text>
            ) : null}

            <Text style={styles.label}>Description</Text>

            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
                errors.description ? styles.inputError : null,
              ]}
              placeholder="Describe the dish..."
              placeholderTextColor="#8B8175"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />

            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : null}

            <Text style={styles.label}>Course</Text>

            <View style={styles.courseContainer}>
              {courses.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.courseButton,
                    course === item && styles.selectedCourse,
                  ]}
                  onPress={() => setCourse(item)}
                >
                  <Text
                    style={[
                      styles.courseButtonText,
                      course === item && styles.selectedCourseText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {errors.course ? (
              <Text style={styles.errorText}>{errors.course}</Text>
            ) : null}

            <Text style={styles.label}>Price</Text>

            <TextInput
              style={[
                styles.input,
                errors.price ? styles.inputError : null,
              ]}
              placeholder="e.g. 89.99"
              placeholderTextColor="#8B8175"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />

            {errors.price ? (
              <Text style={styles.errorText}>{errors.price}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.addButton}
              onPress={addMenuItem}
            >
              <Text style={styles.addButtonText}>+ Add Menu Item</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Your Menu</Text>

            {menuItems.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>
                  No menu items yet
                </Text>

                <Text style={styles.emptyText}>
                  Add your first dish using the form above.
                </Text>
              </View>
            ) : (
              menuItems.map((item) => (
                <View key={item.id} style={styles.menuCard}>
                  <View style={styles.menuCardTop}>
                    <View style={styles.dishTitleContainer}>
                      <Text style={styles.dishName}>
                        {item.dishName}
                      </Text>

                      <View style={styles.courseTag}>
                        <Text style={styles.courseTagText}>
                          {item.course}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.price}>
                      R{item.price}
                    </Text>
                  </View>

                  <Text style={styles.description}>
                    {item.description}
                  </Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8DCC8',
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#171411',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#5F554A',
  },

  formCard: {
    backgroundColor: '#F7F1E7',
    borderRadius: 18,
    padding: 20,
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#171411',
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171411',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8B9A5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#171411',
  },

  descriptionInput: {
    minHeight: 100,
  },

  inputError: {
    borderColor: '#A33A2B',
  },

  errorText: {
    color: '#A33A2B',
    fontSize: 13,
    marginTop: 5,
  },

  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  courseButton: {
    borderWidth: 1,
    borderColor: '#171411',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 15,
    backgroundColor: '#F7F1E7',
  },

  selectedCourse: {
    backgroundColor: '#171411',
  },

  courseButtonText: {
    color: '#171411',
    fontWeight: '600',
  },

  selectedCourseText: {
    color: '#F7F1E7',
  },

  addButton: {
    backgroundColor: '#171411',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },

  addButtonText: {
    color: '#F7F1E7',
    fontSize: 16,
    fontWeight: '800',
  },

  menuSection: {
    marginBottom: 20,
  },

  emptyCard: {
    backgroundColor: '#F7F1E7',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#171411',
    marginBottom: 7,
  },

  emptyText: {
    fontSize: 14,
    color: '#6B6258',
    textAlign: 'center',
  },

  menuCard: {
    backgroundColor: '#F7F1E7',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },

  menuCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  dishTitleContainer: {
    flex: 1,
    paddingRight: 10,
  },

  dishName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#171411',
    marginBottom: 8,
  },

  courseTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#171411',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  courseTagText: {
    color: '#F7F1E7',
    fontSize: 12,
    fontWeight: '700',
  },

  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#171411',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5F554A',
  },
});