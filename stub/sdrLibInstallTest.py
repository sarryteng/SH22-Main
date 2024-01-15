from ctypes.util import find_library
from ctypes import CDLL

libname = find_library('librtlsdr')
print(libname)
lib = CDLL(libname)
print(find_library('rtlsdr'))