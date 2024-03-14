from rtlsdr import RtlSdr

sdr = RtlSdr()

print(sdr.read_samples(512))
