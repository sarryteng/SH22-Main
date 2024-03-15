#  run in 433 Mhz and redirect stdout to tpms.txt
rtl_433 -f 433Mhz | tee tpms.txt

# additional script that is specialized in tpms sensor (-M tpms) with -R offset to it.
# rtl_433 -f 433M -R 20 -M tpms > tpms_data.txt