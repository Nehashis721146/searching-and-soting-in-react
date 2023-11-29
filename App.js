import React, { useEffect, useState } from 'react';
import {
 Button,
 FlatList,
 SafeAreaView,
 Text,
 TextInput,
 Touchable,
 TouchableOpacity,
 View,
} from 'react-native';

const App = () => {
 const [data, setData] = useState([]);
 const [search, setSearch] = useState('');
 const [sorted, setSorted] = useState(false);

 const getAPIData = async () => {
    const url = 'https://jsonplaceholder.org/posts';
    let result = await fetch(url);
    result = await result.json();
    setData(result);
 };

 const handleSearch = (text) => {
    setSearch(text);
 };

 const sortedData = () => {
    let list = data.sort((a, b) => a.title > b.title ? 1 : -1);
    setData(list);
    setSorted(!sorted);
 };

 const previousData = () => {
    let list = data.sort((a, b) => a.id > b.id ? 1 : -1);
    setData(list);
    setSorted(!sorted);
 };

 useEffect(() => {
    getAPIData();
 }, []);

 const renderItem = ({ item }) => (
    <View style={{ marginTop: 10, marginHorizontal: 20 }}>
      <Text style={{ color: 'red' }}>{item.id}</Text>
      <Text style={{ color: 'blue' }}>{item.slug}</Text>
      <Text style={{ color: 'green' }}>{item.title}</Text>
    </View>
 );

 const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||  item.id.toString().includes(search) ||  item.slug.toLowerCase().includes(search.toLowerCase()) 
 );

 return (
    <View>
      <View >
        <View >

          <View style={{ borderWidth:1, paddingHorizontal: 10, marginTop: 10, borderRadius: 20 }}>
            <TextInput
              placeholder="Search by title"
              onChangeText={handleSearch}
              value={search}
            />
          </View>

          <View style={{marginHorizontal:100,marginTop:10}}>
            <Button title='Sort'
              onPress={sortedData}
            />
            {sorted && (
              <View style={{marginTop:10}}>
              <Button title='Previous Order'
                onPress={previousData}
              />
              </View>
            )}
          </View>

          <View>
            <FlatList
              data={search.length > 0 ? filteredData : data}
              renderItem={renderItem}
            />
          </View>
        </View>

      </View>

    </View>
 );
};

export default App;
