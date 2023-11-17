import React from 'react'
import { View } from "react-native";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Button, Text } from "@rneui/themed";
import { decrement, increment } from "../redux/slices/counterSlice";



const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button
                onPress={() => dispatch(increment())}
            >Increment</Button>
            <Text>{count}</Text>
            <Button
                onPress={() => dispatch(decrement())}
            > Decrement</Button>
        </View>
    )
}

export default Counter