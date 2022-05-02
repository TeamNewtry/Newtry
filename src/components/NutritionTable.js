import {StyleSheet, View} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import React, {useContext} from 'react';
import {LocalizationContext} from './Translations';

const NutritionTable = nut => {
  const {translations} = useContext(LocalizationContext);
  const tableHead = [
    translations['nutrition.table.header1'],
    translations['nutrition.table.header2'],
  ];
  const tableData = [
    [
      translations['nutrition.table.field1'],
      ` ${nut.data?.calories ?? 'undefined'} kcal`,
    ],
    [
      translations['nutrition.table.field2'],
      ` ${nut.data?.totalFat ?? 'undefined'} g`,
    ],
    [
      translations['nutrition.table.field3'],
      ` ${nut.data?.saturatedFat ?? 'undefined'} g`,
    ],
    [
      translations['nutrition.table.field4'],
      ` ${nut.data?.carbohydrates ?? 'undefined'} g`,
    ],
    [
      translations['nutrition.table.field5'],
      ` ${nut.data?.sugar ?? 'undefined'} g`,
    ],
    [
      translations['nutrition.table.field6'],
      ` ${nut.data?.protein ?? 'undefined'} g`,
    ],
    [
      translations['nutrition.table.field7'],
      ` ${nut.data?.salt ?? 'undefined'} g`,
    ],
  ];
  return (
    <View>
      <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
        <Row
          data={tableHead}
          flexArr={[2, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={tableData}
            flexArr={[2, 1]}
            resizeMode="contain"
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};

export default NutritionTable;

const styles = StyleSheet.create({
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  row: {
    height: 35,
  },
  text: {textAlign: 'left'},
});
