// screens/Owner/FranchiseDetail.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const FranchiseDetail = ({ navigation, route }) => {
  const franchiseName = route.params?.name || 'Nama Franchise';

  // Data improvisasi untuk KPI
  const kpiData = [
    { indicator: 'Sales Growth', period: 'MoM', current: '15%', previous: '10%', change: '+5%' },
    { indicator: 'Customer Retention', period: 'QoQ', current: '85%', previous: '80%', change: '+5%' },
    { indicator: 'Average Order Value', period: 'YoY', current: 'Rp50.000', previous: 'Rp45.000', change: '+Rp5.000' },
  ];

  // Data improvisasi untuk Log Sales
  const logSalesData = [
    { date: '2024-07-15', action: 'Penjualan', quantity: '20', profit: 'Rp200.000' },
    { date: '2024-07-14', action: 'Penjualan', quantity: '15', profit: 'Rp150.000' },
    { date: '2024-07-13', action: 'Penjualan', quantity: '25', profit: 'Rp250.000' },
    { date: '2024-07-12', action: 'Refund', quantity: '-2', profit: '-Rp20.000' },
    { date: '2024-07-11', action: 'Penjualan', quantity: '18', profit: 'Rp180.000' },
  ];

  // Data improvisasi untuk Sales Summary
  const salesSummary = {
    monthlySales: '2.500',
    monthlyRevenue: 'Rp125.000.000',
    totalRevenue: 'Rp750.000.000',
  };

  // Data untuk simulasi Line Chart (nilai Y)
  const chartPoints = [20, 45, 30, 60, 40, 70, 55]; // Contoh nilai, bisa disesuaikan
  const maxChartValue = Math.max(...chartPoints) * 1.2; // Untuk skala Y
  const minChartValue = Math.min(...chartPoints) * 0.8; // Untuk skala Y
  const chartHeight = height * 0.25; // TINGGI CHART DIPERPANJANG
  const chartWidth = width * 0.5; // Lebar area chart (sekitar 60% dari screen width - padding)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Overview</Text>
          <Text style={styles.franchiseNameHeader}>{franchiseName}</Text>
        </View>

        <View style={styles.topSection}>
          <View style={styles.chartContainer}>
            {/* Grid Background */}
            <View style={styles.chartGridBackground}>
              {/* Garis horizontal */}
              {[0, 0.25, 0.5, 0.75, 1].map((pos, i) => (
                <View
                  key={`h-line-${i}`}
                  style={[styles.chartGridLine, { top: pos * chartHeight }]}
                />
              ))}
              {/* Garis vertikal */}
              {[0, 0.25, 0.5, 0.75, 1].map((pos, i) => (
                <View
                  key={`v-line-${i}`}
                  style={[styles.chartGridLine, { left: pos * chartWidth, width: 1, height: '100%' }]}
                />
              ))}
            </View>
            {/* Line Path */}
            <View style={styles.chartLinePath}>
              {chartPoints.map((point, index) => {
                const xPos = (index / (chartPoints.length - 1)) * chartWidth;
                const normalizedValue = (point - minChartValue) / (maxChartValue - minChartValue);
                const yPos = chartHeight - (normalizedValue * chartHeight);

                // Draw lines between points
                if (index > 0) {
                  const prevPoint = chartPoints[index - 1];
                  const prevXPos = ((index - 1) / (chartPoints.length - 1)) * chartWidth;
                  const prevNormalizedValue = (prevPoint - minChartValue) / (maxChartValue - minChartValue);
                  const prevYPos = chartHeight - (prevNormalizedValue * chartHeight);

                  const dx = xPos - prevXPos;
                  const dy = yPos - prevYPos;
                  const length = Math.sqrt(dx * dx + dy * dy);
                  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                  return (
                    <View
                      key={`line-${index}`}
                      style={[
                        styles.chartSegmentLine,
                        {
                          left: prevXPos,
                          top: prevYPos,
                          width: length,
                          transform: [{ translateX: 0 }, { translateY: 0 }, { rotateZ: `${angle}deg` }],
                          transformOrigin: 'top left',
                        },
                      ]}
                    />
                  );
                }
                return null;
              })}
              {/* Draw points */}
              {chartPoints.map((point, index) => {
                const xPos = (index / (chartPoints.length - 1)) * chartWidth;
                const normalizedValue = (point - minChartValue) / (maxChartValue - minChartValue);
                const yPos = chartHeight - (normalizedValue * chartHeight);
                return (
                  <View
                    key={`point-${index}`}
                    style={[styles.chartPoint, { left: xPos - 3, top: yPos - 3 }]}
                  />
                );
              })}
            </View>
            <Text style={styles.chartTitleOverlay}>Monthly Sales Trend</Text>
          </View>

          <View style={styles.salesSummaryContainer}>
            <TouchableOpacity style={styles.salesSummaryButton}>
              <Text style={styles.salesSummaryLabel}>Monthly Sales</Text>
              <Text style={styles.salesSummaryValue}>{salesSummary.monthlySales}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.salesSummaryButton}>
              <Text style={styles.salesSummaryLabel}>Monthly Revenue</Text>
              <Text style={styles.salesSummaryValue}>{salesSummary.monthlyRevenue}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.salesSummaryButton}>
              <Text style={styles.salesSummaryLabel}>Total Revenue</Text>
              <Text style={styles.salesSummaryValue}>{salesSummary.totalRevenue}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.kpiSection}>
          <Text style={styles.sectionTitle}>Key Performance Index</Text>
          <View style={styles.kpiIndicatorsContainer}>
            <View style={styles.kpiIndicatorCard}>
              <Text style={styles.kpiIndicatorLabel}>Monthly Avg. Gross Value (AOV)</Text>
              <Text style={styles.kpiIndicatorValue}>Rp84.320</Text>
            </View>
            <View style={styles.kpiIndicatorCard}>
              <Text style={styles.kpiIndicatorLabel}>Product Of The Month</Text>
              <Text style={styles.kpiIndicatorValue}>Lava Toast</Text>
            </View>
            <View style={styles.kpiIndicatorCard}>
              <Text style={styles.kpiIndicatorLabel}>Net Profit Margin</Text>
              <Text style={styles.kpiIndicatorValue}>9.6%</Text>
            </View>
          </View>

          <View style={styles.kpiTable}>
            <View style={styles.kpiTableHeader}>
              <Text style={styles.kpiTableHeaderText}>Indicator</Text>
              <Text style={styles.kpiTableHeaderText}>Period</Text>
              <Text style={styles.kpiTableHeaderText}>Current</Text>
              <Text style={styles.kpiTableHeaderText}>Previous</Text>
              <Text style={styles.kpiTableHeaderText}>Change</Text>
            </View>
            {kpiData.map((item, index) => (
              <View key={index} style={styles.kpiTableRow}>
                <Text style={styles.kpiTableRowText}>{item.indicator}</Text>
                <Text style={styles.kpiTableRowText}>{item.period}</Text>
                <Text style={styles.kpiTableRowText}>{item.current}</Text>
                <Text style={styles.kpiTableRowText}>{item.previous}</Text>
                <Text style={styles.kpiTableRowText}>{item.change}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.logSalesSection}>
          <Text style={styles.sectionTitle}>Log Sales</Text>
          <View style={styles.logSalesTable}>
            <View style={styles.logSalesTableHeader}>
              <Text style={styles.logSalesTableHeaderText}>Date</Text>
              <Text style={styles.logSalesTableHeaderText}>Action</Text>
              <Text style={styles.logSalesTableHeaderText}>Quantity</Text>
              <Text style={styles.logSalesTableHeaderText}>Profit</Text>
            </View>
            {logSalesData.map((item, index) => (
              <View key={index} style={styles.logSalesTableRow}>
                <Text style={styles.logSalesTableRowText}>{item.date}</Text>
                <Text style={styles.logSalesTableRowText}>{item.action}</Text>
                <Text style={styles.logSalesTableRowText}>{item.quantity}</Text>
                <Text style={styles.logSalesTableRowText}>{item.profit}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFCF0',
  },
  scrollViewContent: {
    paddingTop: 20,
    paddingHorizontal: width * 0.05,
    paddingBottom: 80,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '12%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  franchiseNameHeader: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  chartContainer: {
    width: '60%',
    height: height * 0.25, // TINGGI CHART DIPERBESAR DI SINI
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  chartGridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  chartGridLine: {
    position: 'absolute',
    backgroundColor: '#E0E0E0',
    height: 1,
    width: '100%',
    opacity: 0.7, // Sedikit lebih transparan
  },
  chartLinePath: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  chartSegmentLine: {
    position: 'absolute',
    backgroundColor: '#355843',
    height: 2,
    borderRadius: 1,
  },
  chartPoint: {
    position: 'absolute',
    width: 8, // Ukuran titik sedikit lebih besar
    height: 8,
    borderRadius: 4,
    backgroundColor: '#355843',
    zIndex: 1,
    borderWidth: 1, // Tambah border untuk titik
    borderColor: '#fff', // Warna border putih
  },
  chartTitleOverlay: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    top: 10,
    left: 10,
  },
  salesSummaryContainer: {
    width: '35%',
    justifyContent: 'space-between',
  },
  salesSummaryButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  salesSummaryLabel: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
    marginBottom: 5,
  },
  salesSummaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
    color: '#000',
    width: '100%',
  },
  kpiSection: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  kpiIndicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  kpiIndicatorCard: {
    width: '30%',
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 10,
  },
  kpiIndicatorLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 5,
  },
  kpiIndicatorValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  kpiTable: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    overflow: 'hidden',
  },
  kpiTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  kpiTableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
  kpiTableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  kpiTableRowText: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  logSalesSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logSalesTable: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    overflow: 'hidden',
  },
  logSalesTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  logSalesTableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
  logSalesTableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  logSalesTableRowText: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});

export default FranchiseDetail;
