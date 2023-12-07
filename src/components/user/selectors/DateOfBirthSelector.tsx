import React, { useState } from "react";
import { SafeAreaView, Text, Platform, View } from "react-native";
import { Button, ListItem } from "@rneui/themed";
import { sizes } from "../../../styles/variables/measures";
import { monthsOfTheYear } from "../../../data/monthsOfTheYear";
import { useDispatch } from "react-redux";
import { updateNewUserField } from "../../../redux/slices/newUserSlice";
import { globalStyles } from "../../../styles";

const DateOfBirthSelector = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date(1598051730000));
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [showDayPicker, setShowDayPicker] = useState(false)

  const [daysInMonth, setDaysInMonth] = useState<number | null>(null);


  const [year, setYear] = useState<number | null>(null)
  const [month, setMonth] = useState<number | null>(null)
  const [day, setDay] = useState<number | null>(null)

  function getYearsInRange(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }

    return years;
  }

  function getDaysInMonth(year: number | null, month: number | null): number | null {
    if (year === null || month === null) {
      // If either year or month is not selected, return null
      return null;
    }

    // Create a new date for the selected year and month
    const selectedDate = new Date(year, month, 1);

    // Move the date to the next month and subtract 1 day to get the last day of the selected month
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    selectedDate.setDate(selectedDate.getDate() - 1);

    // Get the day of the month (the last day of the selected month)
    const lastDayOfMonth = selectedDate.getDate();

    return lastDayOfMonth;
  }


  const handleYearMonthChange = (selectedYear: number | null, selectedMonth: number | null) => {
    const days = getDaysInMonth(selectedYear, selectedMonth);
    setDaysInMonth(days);
  };
  const yearsInRange = getYearsInRange();


  return (
    <SafeAreaView style={{ marginBottom: sizes.M, padding: sizes.XS }}>
      <View style={{ paddingHorizontal: sizes.XS, marginBottom: sizes.S }} >
        <Text style={globalStyles.elementTitle}>What is your date of birth?</Text>
      </View>
      {/* <Button onPress={() => setShowDatePicker(!showDatePicker)} title="Show date picker!" /> */}
      {/* <Text>Selected: {date.toLocaleString()}</Text> */}
      {/* {showDatePicker && ( */}
      <View
        style={{
          display: 'flex',
          gap: sizes.XS,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: month ? 'space-between' : 'flex-start', // Set justifyContent dynamically
          paddingHorizontal: sizes.XS,
        }}       >
        <Button
          type={year ? 'solid' : 'outline'}
          title={year ? `${year}` : "Year"}
          onPress={() => {
            setShowYearPicker(!showYearPicker)

          }}
          buttonStyle={{ width: 56 }}

        />
        {year && <Button
          type={month !== null ? 'solid' : 'outline'}
          title={month !== null ? `${monthsOfTheYear[month - 1]}` : "Month"}
          onPress={() => {
            setShowMonthPicker(!showMonthPicker)
          }}
        // buttonStyle={{ width: 112 }}

        />}

        {year && month ? <Button
          type={day !== null ? 'solid' : 'outline'}
          title={day !== null ? `${day}` : "Day"}
          onPress={() => {
            setYear(year);
            setMonth(month);
            handleYearMonthChange(year, month);
            setShowDayPicker(!showDayPicker);
          }}
          buttonStyle={{ width: 42 }}
        /> : null}
      </View>
      <View>
        {showYearPicker && yearsInRange.map(year => (
          <ListItem key={year}
            bottomDivider
            onPress={() => {
              setYear(year);
              handleYearMonthChange(year, month);
              dispatch(updateNewUserField({ key: 'age', value: `${year}-${month}-${day}` }));
              setShowYearPicker(false);
            }} >
            <ListItem.Content>
              <ListItem.Title>{year}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

        ))}
      </View>
      <View>
        {showMonthPicker && monthsOfTheYear.map((monthName, index) => (
          <ListItem key={monthName} bottomDivider onPress={() => {
            setMonth(index + 1);
            handleYearMonthChange(year, month);
            dispatch(updateNewUserField({ key: 'age', value: `${year}-${index + 1}-${day}` }));
            setShowMonthPicker(!showMonthPicker);
          }}>
            <ListItem.Content>
              <ListItem.Title>{monthName}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View>
        {showDayPicker ? daysInMonth !== null &&
          Array.from({ length: daysInMonth }, (_, index) => index + 1).map((dayNumber) => (
            <ListItem
              key={dayNumber}
              bottomDivider
              onPress={() => {
                setDay(dayNumber);
                dispatch(updateNewUserField({ key: 'age', value: `${year}-${month}-${dayNumber}` }));
                setShowDayPicker(!showDayPicker);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{dayNumber}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )) : null}
      </View>
    </SafeAreaView>
  );
};

export default DateOfBirthSelector;
