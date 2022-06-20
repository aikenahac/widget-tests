import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import axios from "axios";
import { Checkbox } from "react-native-paper";

const App = () => {
    const apiUrl = "https://sl.aikenahac.com/api";

    const [name, setName] = useState<string>();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchName();
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const resp = await axios.get<ItemsData>(`${apiUrl}/items`);

        setItems(resp.data.data);
    };

    const fetchName = async () => {
        const resp = await axios.get<{ data: FamilyNameData }>(
            `${apiUrl}/family-name`,
        );

        setName(resp.data.data.attributes.name);
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.title}>{name}</Text>
            </View>
            <View style={{ height: 20 }} />
            <ScrollView>
                {items?.map((item: Item) => (
                    <View key={item.id} style={styles.item}>
                        <Text style={styles.itemText}>
                            {item.attributes.name}
                        </Text>
                        <Checkbox
                            status={
                                item.attributes.bought ? "checked" : "unchecked"
                            }
                        />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#232323",
        paddingHorizontal: 16,
    },

    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
    },

    title: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },

    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    itemText: {
        color: "white",
    },
});

// Family name types
// Endpoint: /family-name
interface FNAttributes {
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}

interface FamilyNameData {
    readonly id: number;
    readonly attributes: FNAttributes;
}

// Item types
// Endpoint: /items
interface ItemAttributes {
    readonly name: string;
    readonly bought: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}

interface Item {
    readonly id: number;
    readonly attributes: ItemAttributes;
}

interface ItemsData {
    readonly data: Item[];
}

export default App;
