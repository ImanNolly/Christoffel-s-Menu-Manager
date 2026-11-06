import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [feedback, setFeedback] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const [errors, setErrors] = useState({
    dishName: '',
    description: '',
    course: '',
    price: '',
  });

  // Both adding and editing use the same form and validation.
  const resetForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setEditingId(null);
    setErrors({ dishName: '', description: '', course: '', price: '' });
  };

  const startEditing = (item: MenuItem) => {
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
    setEditingId(item.id);
    setDeleteId(null);
    setFeedback('Editing ' + item.dishName + '. Save changes when finished.');
    setErrors({ dishName: '', description: '', course: '', price: '' });
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((items) => items.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
    setDeleteId(null);
    setFeedback('Menu item deleted successfully.');
  };

  const filteredItems = menuItems.filter((item) =>
    item.dishName.toLowerCase().includes(searchText.trim().toLowerCase()) &&
    (filterCourse === 'All' || item.course === filterCourse)
  );

  const averagePrice = menuItems.length
    ? menuItems.reduce((total, item) => total + Number(item.price), 0) / menuItems.length
    : 0;

  const courseCounts = courses.map((name) => ({
    name,
    count: menuItems.filter((item) => item.course === name).length,
  }));

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
    } else if (!Number.isFinite(Number(price.replace(',', '.'))) || Number(price.replace(',', '.')) <= 0) {
      newErrors.price = 'Please enter a valid price greater than 0.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    const newItem: MenuItem = {
      id: editingId ?? (Date.now().toString() + Math.random().toString(36).slice(2, 7)),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price.replace(',', '.')).toFixed(2),
    };

    if (editingId) {
      setMenuItems((items) => items.map((item) => item.id === editingId ? newItem : item));
      setFeedback('Menu item updated successfully.');
    } else {
      setMenuItems((items) => [...items, newItem]);
      setFeedback('Menu item added successfully.');
    }
    resetForm();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Chef's Menu Manager</Text>
            <Text style={styles.subtitle}>
              Add and manage your menu items
            </Text>
          </View>

          {feedback ? (
            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackText}>{feedback}</Text>
            </View>
          ) : null}

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</Text>

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
              <Text style={styles.addButtonText}>
                {editingId ? 'Save Changes' : '+ Add Menu Item'}
              </Text>
            </TouchableOpacity>

            {editingId ? (
              <TouchableOpacity style={styles.cancelButton} onPress={() => {
                resetForm();
                setFeedback('Editing cancelled.');
              }}>
                <Text style={styles.cancelButtonText}>Cancel Editing</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Menu Statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{menuItems.length}</Text>
                <Text style={styles.statLabel}>Total Dishes</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>R{averagePrice.toFixed(2)}</Text>
                <Text style={styles.statLabel}>Average Price</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              {courseCounts.map(({ name, count }) => (
                <View key={name} style={styles.courseStat}>
                  <Text style={styles.statNumber}>{count}</Text>
                  <Text style={styles.statLabel}>{name}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Your Menu</Text>
            <TextInput
              style={styles.input}
              placeholder="Search dishes by name..."
              placeholderTextColor="#8B8175"
              value={searchText}
              onChangeText={setSearchText}
              accessibilityLabel="Search menu items"
            />
            <Text style={styles.filterLabel}>Filter by Course</Text>
            <View style={styles.courseContainer}>
              {['All', ...courses].map((name) => (
                <TouchableOpacity
                  key={name}
                  style={[styles.courseButton, filterCourse === name && styles.selectedCourse]}
                  onPress={() => setFilterCourse(name)}
                >
                  <Text style={[styles.courseButtonText, filterCourse === name && styles.selectedCourseText]}>
                    {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {(searchText || filterCourse !== 'All') ? (
              <TouchableOpacity style={styles.clearButton} onPress={() => {
                setSearchText('');
                setFilterCourse('All');
              }}>
                <Text style={styles.clearButtonText}>Clear Search & Filters</Text>
              </TouchableOpacity>
            ) : null}
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
              filteredItems.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyTitle}>No matching dishes</Text>
                  <Text style={styles.emptyText}>Try another name or clear the course filter.</Text>
                </View>
              ) : filteredItems.map((item) => (
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
                  <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => setDeleteId(item.id)}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                  {deleteId === item.id ? (
                    <View style={styles.deleteConfirm}>
                      <Text style={styles.confirmText}>Delete {item.dishName}? This cannot be undone.</Text>
                      <View style={styles.actionsRow}>
                        <TouchableOpacity style={styles.editButton} onPress={() => setDeleteId(null)}>
                          <Text style={styles.editButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMenuItem(item.id)}>
                          <Text style={styles.deleteButtonText}>Confirm Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
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
  feedbackCard: {
    backgroundColor: '#E3EAD9',
    borderColor: '#7B936B',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  feedbackText: { color: '#2D482B', fontWeight: '600', fontSize: 14 },
  cancelButton: { padding: 13, alignItems: 'center', marginTop: 8 },
  cancelButtonText: { fontSize: 15, fontWeight: '700', color: '#5F554A' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  statBox: { flex: 1, backgroundColor: '#E8DCC8', borderRadius: 12, padding: 14, alignItems: 'center' },
  courseStat: { flex: 1, backgroundColor: '#E8DCC8', borderRadius: 12, padding: 10, alignItems: 'center' },
  statNumber: { fontSize: 19, fontWeight: '800', color: '#171411' },
  statLabel: { fontSize: 12, color: '#5F554A', marginTop: 4, textAlign: 'center' },
  filterLabel: { fontSize: 15, fontWeight: '700', color: '#171411', marginTop: 16, marginBottom: 8 },
  clearButton: { alignSelf: 'flex-start', paddingVertical: 13, marginBottom: 8 },
  clearButtonText: { color: '#5F554A', fontWeight: '700', textDecorationLine: 'underline' },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  editButton: { backgroundColor: '#E8DCC8', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 },
  editButtonText: { color: '#171411', fontWeight: '700' },
  deleteButton: { backgroundColor: '#A33A2B', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 18 },
  deleteButtonText: { color: '#FFFFFF', fontWeight: '700' },
  deleteConfirm: { marginTop: 10, borderTopWidth: 1, borderColor: '#C8B9A5', paddingTop: 12 },
  confirmText: { color: '#171411', fontWeight: '600' },
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